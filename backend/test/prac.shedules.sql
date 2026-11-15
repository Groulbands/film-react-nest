-- All film sessions, foreign-keyed to films.id.
-- Do not run this file before prac.films.sql.
BEGIN;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
  '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  '2024-06-28T10:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '5beec101-acbb-4158-adc6-d855716b44a8',
  '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  '2024-06-28T14:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '89ee32f3-8164-40a6-b237-f4d492450250',
  '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  '2024-06-28T16:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'd6a4ed9b-51d6-4df2-b66e-d75175deb373',
  '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  '2024-06-29T11:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'a8af36c3-65ee-4224-a77d-c9ebb790ba66',
  '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  '2024-06-29T15:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '0cf8b68c-fcf2-4c0a-97ba-45990231fa0e',
  '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  '2024-06-29T17:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '2519ca34-32b4-4a7f-971d-3bb585c6450b',
  '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  '2024-06-30T12:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'b105ad4b-ecd2-4556-abaf-9a95403dc01c',
  '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  '2024-06-30T16:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '02a9feb2-fc92-4386-a917-aa79e7f8fd7f',
  '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
  '2024-06-30T18:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '9647fcf2-d0fa-4e69-ad90-2b23cff15449',
  '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
  '2024-06-28T10:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '9f2db237-01d0-463e-a150-89f30bfc4250',
  '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
  '2024-06-28T14:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '3d5f5d12-b4d8-44d3-a440-1b91616fda40',
  '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
  '2024-06-28T16:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '7f59de0d-62b2-412f-9e0b-bf6e971c44e5',
  '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
  '2024-06-29T11:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '65f4a65e-1bc1-4677-842b-10e9b317b287',
  '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
  '2024-06-29T15:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'b3ba6b69-050e-498c-9cdb-92711d8e4180',
  '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
  '2024-06-29T17:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'd87ee9ab-4d84-43bb-85d6-f71aced22f73',
  '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
  '2024-06-30T12:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'eed1469f-c95e-428a-870d-13cbfe4ac2ac',
  '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
  '2024-06-30T16:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '68437c84-6c35-4203-bff7-021d16042a6b',
  '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
  '2024-06-30T18:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '351b437c-3430-4a35-b71d-b93b3d80274a',
  '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
  '2024-06-28T10:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '2661b7e2-7654-4d17-aa5d-9da76e4fb563',
  '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
  '2024-06-28T14:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'd155ff3f-d547-4e4d-a530-bfcdcb3efbd5',
  '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
  '2024-06-28T16:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'baf5d315-f3ad-4ebc-bbdc-544c51f3a2f3',
  '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
  '2024-06-29T11:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '5a102896-b6ac-4db1-9f93-1653dde8a5f2',
  '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
  '2024-06-29T15:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'c06b2048-a159-4356-b51b-3d7817766d02',
  '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
  '2024-06-29T17:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'ee489a8b-68be-48a1-b62f-896981d60b06',
  '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
  '2024-06-30T12:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'a33f5fda-c4d8-4a1b-9f86-cd39d73fdc98',
  '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
  '2024-06-30T16:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '24074084-1d42-49ff-b0fb-e64029674718',
  '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
  '2024-06-30T18:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '793009d6-030c-4dd4-8d13-9ba500724b38',
  '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
  '2024-06-28T10:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY['3:3', '1:4', '1:5', '1:3', '1:2']::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '27a6c145-d5bf-4722-8bd9-b58c5b6b718f',
  '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
  '2024-06-28T14:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '1f57131e-eb9c-41a2-b451-89ea7f691fb7',
  '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
  '2024-06-28T16:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'bfd27e0e-3a21-465c-966c-c874da242875',
  '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
  '2024-06-29T11:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY['2:2', '2:3']::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '4ba7c6c6-33ba-4f1f-9a64-538d59d90c10',
  '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
  '2024-06-29T15:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'e75cded8-ebad-4286-9e3e-b3e852916f8c',
  '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
  '2024-06-29T17:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '516f87d0-8a36-4663-a079-1e9695b9a412',
  '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
  '2024-06-30T12:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '3573d55b-9a7f-484b-a0e0-b204af6d86d0',
  '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
  '2024-06-30T16:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '208ec902-8955-4a52-bdc3-a6ff04602ed9',
  '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
  '2024-06-30T18:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'd3f54ca3-8e19-4b63-afd4-6a8d03933339',
  '0354a762-8928-427f-81d7-1656f717f39c',
  '2024-06-28T10:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '2d794723-eadc-43ea-b82b-268f0178fb43',
  '0354a762-8928-427f-81d7-1656f717f39c',
  '2024-06-28T14:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '043eb8fb-454a-40d2-9ce9-6fe80072bf8b',
  '0354a762-8928-427f-81d7-1656f717f39c',
  '2024-06-28T16:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'aa366df5-f035-43ec-8088-87e042110f3d',
  '0354a762-8928-427f-81d7-1656f717f39c',
  '2024-06-29T11:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '87b49000-5481-49d1-b481-b4f416f3e9bb',
  '0354a762-8928-427f-81d7-1656f717f39c',
  '2024-06-29T15:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '9c1bd824-2330-4a8e-ab9d-6ac2180c9c5e',
  '0354a762-8928-427f-81d7-1656f717f39c',
  '2024-06-29T17:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '20778761-4041-4a71-bf9f-0bfd63930ae8',
  '0354a762-8928-427f-81d7-1656f717f39c',
  '2024-06-30T12:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '2aa2877b-9c15-4f56-8eea-936cfda5890a',
  '0354a762-8928-427f-81d7-1656f717f39c',
  '2024-06-30T16:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '53d4d8a0-d79f-4485-b4ce-ffc3a75540cb',
  '0354a762-8928-427f-81d7-1656f717f39c',
  '2024-06-30T18:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '5274c89d-f39c-40f9-bea8-f22a22a50c8a',
  '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  '2024-06-28T10:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '3f7ed030-230c-4b06-bfc7-eeaee7f3f79b',
  '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  '2024-06-28T14:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '8e8c2627-4578-42b1-a59a-9ec4964a03e1',
  '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  '2024-06-28T16:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '940e657a-69fa-4f71-a48e-3c064dcb61fd',
  '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  '2024-06-29T11:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  'ffde1149-dbc7-49b2-964d-a8de6a45709c',
  '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  '2024-06-29T15:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '6a0d0a68-2f74-4164-aac5-45e0e07adb86',
  '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  '2024-06-29T17:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '9d3d3914-ea59-46a0-80a2-4e320e82956a',
  '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  '2024-06-30T12:00:53+03:00',
  0,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '5c68663d-1a71-401c-9214-e79af571c347',
  '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  '2024-06-30T16:00:53+03:00',
  1,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
INSERT INTO schedules (id, film_id, daytime, hall, rows, seats, price, taken) VALUES (
  '2644a72a-6f17-4c61-a405-9c48bb0ea682',
  '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  '2024-06-30T18:00:53+03:00',
  2,
  5,
  10,
  350,
  ARRAY[]::text[]
) ON CONFLICT (id) DO NOTHING;
COMMIT;
