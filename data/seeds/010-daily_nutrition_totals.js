exports.seed = function(knex) {
  const {
    presentMinusXDays,
    tomorrow
  } = require("../helpers/timestampOffsetFns");

  // Deletes ALL existing entries
  return knex("daily_nutrition_totals")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("daily_nutrition_totals").insert([
        {
          user_id: 1,
          date: presentMinusXDays(180),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(179),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(178),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(177),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(176),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(175),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(174),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(173),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },

        {
          user_id: 1,
          date: presentMinusXDays(172),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(171),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(170),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(169),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(168),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(167),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(166),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(165),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(164),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(163),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(162),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(161),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(160),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(159),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(158),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(157),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(156),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(155),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(154),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(153),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(152),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(151),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(150),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },

        {
          user_id: 1,
          date: presentMinusXDays(149),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(148),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(147),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(146),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(145),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(144),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          // id: 13,
          user_id: 1,
          date: presentMinusXDays(143),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(142),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(141),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(140),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(139),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(138),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(137),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(136),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(135),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(134),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(133),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(132),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(131),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(130),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(129),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(128),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(127),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },

        {
          user_id: 1,
          date: presentMinusXDays(126),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(125),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(124),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(123),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(122),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(121),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(120),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(119),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(118),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(117),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(116),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(115),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(114),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(113),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(112),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(111),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(110),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(109),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(108),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(107),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(106),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(105),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(104),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },

        {
          user_id: 1,
          date: presentMinusXDays(103),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(102),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(101),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(100),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(99),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(98),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          // id: 13,
          user_id: 1,
          date: presentMinusXDays(97),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(96),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(95),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(94),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(93),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(92),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(91),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(90),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(89),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(88),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(87),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(86),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(85),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(84),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(83),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },

        {
          user_id: 1,
          date: presentMinusXDays(82),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(81),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(80),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(79),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(78),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(77),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(76),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(75),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(74),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(73),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(72),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(71),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(70),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(69),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(68),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(67),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(66),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(65),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(64),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(63),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(62),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(61),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(60),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },

        {
          user_id: 1,
          date: presentMinusXDays(59),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(58),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(57),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(56),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(55),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(54),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          // id: 13,
          user_id: 1,
          date: presentMinusXDays(53),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(52),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(51),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(50),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(49),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(48),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(47),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(46),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(45),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(44),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(43),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(42),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(41),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(40),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(39),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(38),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(37),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },

        {
          user_id: 1,
          date: presentMinusXDays(36),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(35),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(34),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(33),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(32),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(31),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(30),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(29),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(28),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(27),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(26),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(25),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(24),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(23),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(22),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(21),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(20),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(19),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(18),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(17),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(16),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(15),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          user_id: 1,
          date: presentMinusXDays(14),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(13),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(12),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(11),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(10),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(9),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(8),
          total_calories: 2121,
          fat_calories: 1401,
          protein_calories: 2121 - 1401 - 210,
          carbs_calories: 210
        },
        {
          // id: 13,
          user_id: 1,
          date: presentMinusXDays(7),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(6),
          total_calories: 2134,
          fat_calories: 1400,
          protein_calories: 2134 - 1400 - 200,
          carbs_calories: 200
        },
        {
          user_id: 1,
          date: presentMinusXDays(5),
          total_calories: 1921,
          fat_calories: 1325,
          protein_calories: 2134 - 1325 - 237,
          carbs_calories: 237
        },
        {
          user_id: 1,
          date: presentMinusXDays(4),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(3),
          total_calories: 2031,
          fat_calories: 1234,
          protein_calories: 2031 - 1234 - 291,
          carbs_calories: 291
        },
        {
          user_id: 1,
          date: presentMinusXDays(2),
          total_calories: 2204,
          fat_calories: 1298,
          protein_calories: 2204 - 1298 - 221,
          carbs_calories: 221
        },
        {
          user_id: 1,
          date: presentMinusXDays(1),
          total_calories: 2137,
          fat_calories: 1451,
          protein_calories: 2137 - 1451 - 223,
          carbs_calories: 223
        },
        {
          user_id: 1,
          date: presentMinusXDays(0),
          total_calories: 2156,
          fat_calories: 1378,
          protein_calories: 2204 - 1378 - 221,
          carbs_calories: 221
        }
      ]);
    });
};
