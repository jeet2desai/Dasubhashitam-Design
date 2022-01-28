CREATE TABLE `searchResult` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `searchResult` (`id`, `name`, `description`, `image`) VALUES
(1, 'Yandamuri Veerendranath', 'Author', 'albumcover-1.png'),
(2, 'Best of Yandamuri', 'Title Yandamuri Veerendranath', 'albumcover-2.png'),
(3, 'Yandamuri’s Adventure', 'Chapter Best of Yandamuri Yandamuri Veerendranath', 'albumcover-1.png'),
(4, 'Yandamuri Tales', 'Special - tag', 'albumcover-2.png'),
(5, 'Customise App', 'Author', 'albumcover-1.png'),
(6, 'Best of Yandamuri', 'Title Yandamuri Veerendranath', 'albumcover-2.png'),
(7, 'app customise banner content', 'Chapter Best of Yandamuri Yandamuri Veerendranath  Yandamuri Veerendranath', 'albumcover-1.png'),
(8, 'app customise adds', 'Special - tag', 'albumcover-2.png'),
(9, 'title details view mode', 'Author', 'albumcover-1.png'),
(10, 'app customise titles collections', 'Title Yandamuri Veerendranath', 'albumcover-2.png'),
(11, 'dashboard', 'Chapter Best of Yandamuri Yandamuri Veerendranath', 'albumcover-1.png'),
(12, 'app customise moments video3', 'Special - tag', 'albumcover-2.png');
