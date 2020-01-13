exports.seed = function(knex) {
  const { presentMinusXDays } = require("../helpers/timestampOffsetFns");
  const { presentMinusXHours } = require("../helpers/timestampOffsetFns");
  // Deletes ALL existing entries
  return knex("user_budget_data")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("user_budget_data").insert([
        {
          user_id: 1,
          applicable_date: presentMinusXDays(112),
          goal_start_date: presentMinusXDays(112),
          goal_end_date: presentMinusXDays(-30),
          goal_weekly_weight_change_rate: -1.0,
          goal_weight_kg: 72.58,
          actual_weight_kg: 81.65,
          activity_level: 1.55,
          caloric_budget: 2000.0,
          fat_ratio: 0.7,
          protein_ratio: 0.2,
          carb_ratio: 0.1
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(112),
          actual_weight_kg: 81.58571428571429
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(111),
          actual_weight_kg: 81.52142857142857
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(110),
          actual_weight_kg: 81.45714285714286
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(109),
          actual_weight_kg: 82.39285714285714
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(108),
          actual_weight_kg: 81.32857142857142
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(107),
          actual_weight_kg: 81.2642857142857
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(106),
          actual_weight_kg: 81.19999999999999
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(105),
          actual_weight_kg: 81.13571428571427
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(104),
          actual_weight_kg: 81.07142857142856
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(103),
          actual_weight_kg: 81.00714285714284
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(102),
          actual_weight_kg: 79.94285714285712
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(101),
          actual_weight_kg: 80.8785714285714
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(100),
          actual_weight_kg: 80.81428571428569
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(99),
          actual_weight_kg: 80.74999999999997
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(98),
          actual_weight_kg: 80.68571428571425
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(97),
          actual_weight_kg: 80.62142857142854
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(96),
          actual_weight_kg: 80.55714285714282
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(95),
          actual_weight_kg: 80.4928571428571
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(94),
          actual_weight_kg: 80.42857142857139
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(93),
          actual_weight_kg: 80.36428571428567
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(92),
          actual_weight_kg: 80.29999999999995
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(91),
          actual_weight_kg: 80.23571428571424
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(90),
          actual_weight_kg: 80.17142857142852
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(89),
          actual_weight_kg: 80.1071428571428
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(88),
          actual_weight_kg: 80.04285714285709
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(87),
          actual_weight_kg: 79.97857142857137
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(86),
          actual_weight_kg: 78.91428571428565
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(85),
          actual_weight_kg: 80.84999999999994
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(84),
          actual_weight_kg: 79.78571428571422
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(83),
          actual_weight_kg: 79.7214285714285
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(82),
          actual_weight_kg: 79.65714285714279
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(81),
          actual_weight_kg: 79.59285714285707
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(80),
          actual_weight_kg: 79.52857142857135
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(79),
          actual_weight_kg: 79.46428571428564
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(78),
          actual_weight_kg: 79.39999999999992
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(77),
          actual_weight_kg: 79.3357142857142
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(76),
          actual_weight_kg: 79.27142857142849
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(75),
          actual_weight_kg: 79.20714285714277
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(74),
          actual_weight_kg: 78.14285714285705
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(73),
          actual_weight_kg: 79.07857142857134
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(72),
          actual_weight_kg: 79.01428571428562
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(71),
          actual_weight_kg: 79.9499999999999
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(70),
          actual_weight_kg: 81.88571428571419
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(69),
          actual_weight_kg: 78.82142857142847
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(68),
          actual_weight_kg: 79.75714285714275
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(67),
          actual_weight_kg: 78.69285714285704
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(66),
          actual_weight_kg: 78.62857142857132
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(65),
          actual_weight_kg: 78.5642857142856
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(64),
          actual_weight_kg: 79.49999999999989
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(63),
          actual_weight_kg: 78.43571428571417
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(62),
          actual_weight_kg: 78.37142857142845
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(61),
          actual_weight_kg: 78.30714285714274
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(60),
          actual_weight_kg: 78.24285714285702
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(59),
          actual_weight_kg: 78.1785714285713
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(58),
          actual_weight_kg: 78.11428571428559
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(57),
          actual_weight_kg: 78.04999999999987
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(56),
          actual_weight_kg: 77.98571428571415
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(55),
          actual_weight_kg: 77.92142857142844
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(54),
          actual_weight_kg: 76.85714285714272
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(53),
          actual_weight_kg: 76.792857142857
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(52),
          actual_weight_kg: 77.72857142857129
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(51),
          actual_weight_kg: 77.66428571428557
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(50),
          actual_weight_kg: 77.59999999999985
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(49),
          actual_weight_kg: 77.53571428571414
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(48),
          actual_weight_kg: 77.47142857142842
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(47),
          actual_weight_kg: 77.4071428571427
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(46),
          actual_weight_kg: 77.34285714285699
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(45),
          actual_weight_kg: 77.27857142857127
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(44),
          actual_weight_kg: 77.21428571428555
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(43),
          actual_weight_kg: 77.14999999999984
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(42),
          actual_weight_kg: 78.08571428571412
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(41),
          actual_weight_kg: 77.0214285714284
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(40),
          actual_weight_kg: 76.95714285714268
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(39),
          actual_weight_kg: 76.89285714285697
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(38),
          actual_weight_kg: 75.82857142857125
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(37),
          actual_weight_kg: 76.76428571428553
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(36),
          actual_weight_kg: 75.69999999999982
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(35),
          actual_weight_kg: 75.6357142857141
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(34),
          actual_weight_kg: 77.57142857142838
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(33),
          actual_weight_kg: 76.50714285714267
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(32),
          actual_weight_kg: 76.44285714285695
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(31),
          actual_weight_kg: 76.37857142857123
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(30),
          actual_weight_kg: 76.31428571428552
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(29),
          actual_weight_kg: 76.2499999999998
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(28),
          actual_weight_kg: 76.18571428571408
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(27),
          actual_weight_kg: 76.12142857142837
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(26),
          actual_weight_kg: 75.05714285714265
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(25),
          actual_weight_kg: 75.99285714285693
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(24),
          actual_weight_kg: 75.92857142857122
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(23),
          actual_weight_kg: 75.8642857142855
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(22),
          actual_weight_kg: 75.79999999999978
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(21),
          actual_weight_kg: 75.73571428571407
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(20),
          actual_weight_kg: 75.67142857142835
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(19),
          actual_weight_kg: 75.60714285714263
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(18),
          actual_weight_kg: 75.54285714285692
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(17),
          actual_weight_kg: 76.4785714285712
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(16),
          actual_weight_kg: 75.41428571428548
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(15),
          actual_weight_kg: 75.34999999999977
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(14),
          actual_weight_kg: 75.28571428571405
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(13),
          actual_weight_kg: 75.22142857142833
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(12),
          actual_weight_kg: 75.15714285714262
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(11),
          actual_weight_kg: 75.0928571428569
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(10),
          actual_weight_kg: 75.02857142857118
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(9),
          actual_weight_kg: 74.96428571428547
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(8),
          actual_weight_kg: 75.89999999999975
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(7),
          actual_weight_kg: 74.83571428571403
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(6),
          actual_weight_kg: 74.77142857142832
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(5),
          actual_weight_kg: 74.7071428571426
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(4),
          actual_weight_kg: 74.64285714285688
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(3),
          actual_weight_kg: 74.57857142857117
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(2),
          actual_weight_kg: 74.51428571428545
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(1),
          actual_weight_kg: 74.44999999999973
        },
        {
          user_id: 1,
          applicable_date: presentMinusXDays(0),
          actual_weight_kg: 74.38571428571402
        }
      ]);
    });
};
