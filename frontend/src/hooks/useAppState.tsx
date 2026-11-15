import {ReactNode, Reducer, useEffect, useReducer, useRef, useState} from "react";
import {Actions, appReducer, AppState, initialState, Modals} from "../utils/state.ts";
import {Contacts, FilmAPI, IFilmAPI, Movie, Session} from "../utils/api.ts";
import {API_URL, CDN_URL} from "../utils/constants.ts";
import {Button} from "../components/Button/Button.tsx";

const flow : Record<Modals, { next: Modals | null, prev: Modals | null }> = {
    'schedule': { next: 'places', prev: null },
    'places': { next: 'basket', prev: 'schedule' },
    'basket': { next: 'contacts', prev: 'places' },
    'contacts': { next: 'success', prev: 'basket' },
    'success': { next: null, prev: 'contacts' }
};

const getOrderErrorMessage = (error: unknown): string => {
    if (typeof error === 'string' && error.trim()) return error;
    if (error instanceof TypeError) {
        return 'Не удалось связаться с сервером. Проверьте подключение и повторите попытку.';
    }
    if (error instanceof Error && error.message) return error.message;
    return 'Не удалось оформить заказ. Попробуйте ещё раз.';
};

export function useAppState() {
    const [state, dispatch] = useReducer<Reducer<AppState, Actions>>(appReducer, initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const orderInFlight = useRef(false);

    const api = useRef<IFilmAPI>(new FilmAPI(
        CDN_URL,
        API_URL
    ));

    const preview = state.films.find(film => film.id === state.selectedFilm);
    const session = state.schedule.find(session => session.id === state.selectedSession);
    const basket = state.basket.map(ticket => ({
        id: `${ticket.row}:${ticket.seat}`,
        place: `${ticket.row} ряд, ${ticket.seat} место`,
        price: `${ticket.price}₽`,
        session: `${ticket.day} ${ticket.time}`
    }));

    const setFilms = (items: Movie[]) => dispatch({ type: 'setFilms', payload: items });
    const setSelectedFilm = (id: string) => dispatch({ type: 'selectFilm', payload: id });
    const setCurrentSchedule = (items: Session[]) => dispatch({ type: 'setSchedule', payload: items });
    const selectSession = (id: string) => dispatch({ type: 'selectSession', payload: id });
    const selectPlace = (place: string) => dispatch({ type: 'addToBasket', payload: place });
    const removeTicket = (place: string) => dispatch({ type: 'removeFromBasket', payload: place });
    const closeModal = () => dispatch({ type: 'closeModal' });
    const setContacts = (contacts: Contacts) => dispatch({ type: 'setContacts', payload: contacts });

    const orderTickets = async () => {
        if (orderInFlight.current) return;

        orderInFlight.current = true;
        setIsSubmitting(true);
        dispatch({ type: 'clearRequestError' });

        try {
            await api.current.orderTickets({
                email: state.contacts.email,
                phone: state.contacts.phone,
                tickets: state.basket
            });
            dispatch({ type: 'clearBasket' });
            dispatch({ type: 'openModal', payload: 'success' });
        } catch (error: unknown) {
            dispatch({ type: 'setRequestError', payload: getOrderErrorMessage(error) });
        } finally {
            orderInFlight.current = false;
            setIsSubmitting(false);
        }
    };

    const go = (direction: 'next' | 'prev') => () => {
        if (state.modal) {
            const next = flow[state.modal][direction];
            if (next) dispatch({ type: 'openModal', payload: next });
            else dispatch({ type: 'closeModal' });
        }
    };

    const getAction = () => {
        const actions: Record<Modals, ReactNode | null> = {
            'schedule': <Button
                label={"Выбрать места"}
                onClick={go('next')}
                disabled={!state.selectedSession}
            />,
            'places': <Button
                label={"В корзину"}
                onClick={go('next')}
                disabled={state.basket.length === 0}
            />,
            'basket': <Button
                label={"Оформить заказ"}
                onClick={go('next')}
                disabled={state.basket.length === 0}
            />,
            'contacts': <Button
                label={"Оплатить"}
                onClick={orderTickets}
                disabled={isSubmitting || !state.contacts.email || !state.contacts.phone}
            />,
            'success': null
        };

        return actions[state.modal!];
    };

    const handleOpenBasket = () => {
        dispatch({ type: 'openModal', payload: 'basket' });
    };
    const handleOpenFilm = () => {
        if (state.selectedFilm) {
            api.current.getFilmSchedule(state.selectedFilm).then(setCurrentSchedule);
        }
    };

    useEffect(() => {
        api.current.getFilms().then(setFilms);
    }, []);

    return {
        state,
        data: {
            preview,
            session,
            basket
        },
        handlers: {
            setSelectedFilm,
            selectSession,
            selectPlace,
            removeTicket,
            closeModal,
            setContacts,
            handleOpenBasket,
            handleOpenFilm,
            getAction,
            go
        }
    };
}