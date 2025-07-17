export interface YouTubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  tags: string[];
  instructor: string;
  duration: string;
  thumbnail?: string;
}

export const youtubeVideos: YouTubeVideo[] = [
  {
    id: '1',
    youtubeId: 'RBSGKlAvoiM',
    title: 'Data Structures Easy to Advanced Course - Full Tutorial from a Google Engineer',
    description: 'Learn and master the most common data structures in this full course from Google engineer William Fiset. This course teaches data structures to beginners using high quality animations to represent the data structures visually.',
    tags: ['プログラミング', 'データ構造', 'アルゴリズム'],
    instructor: 'William Fiset',
    duration: '8:04:21',
  },
  {
    id: '2',
    youtubeId: 'fqMOX6JJhGo',
    title: 'Docker Tutorial for Beginners - A Full DevOps Course on How to Run Applications in Containers',
    description: 'Get started using Docker with this end-to-end beginners course with hands-on labs. Docker is an open platform for developers and sysadmins to build, ship, and run distributed applications.',
    tags: ['DevOps', 'Docker', '社内整備'],
    instructor: 'FreeCodeCamp',
    duration: '2:10:18',
  },
  {
    id: '3',
    youtubeId: 'GxerMvGNAm0',
    title: 'Artificial Intelligence Full Course | Artificial Intelligence Tutorial for Beginners',
    description: 'This Edureka video on "Artificial Intelligence" will provide you with a comprehensive and detailed knowledge of Artificial Intelligence concepts with hands-on examples.',
    tags: ['AI活用', '機械学習', 'プログラミング'],
    instructor: 'Edureka',
    duration: '5:18:48',
  },
  {
    id: '4',
    youtubeId: 'rfscVS0vtbw',
    title: 'Learn Python - Full Course for Beginners [Tutorial]',
    description: 'This course will give you a full introduction into all of the core concepts in python. Follow along with the videos and you will be a python programmer in no time!',
    tags: ['プログラミング', 'Python', '初心者向け'],
    instructor: 'FreeCodeCamp',
    duration: '4:26:52',
  },
  {
    id: '5',
    youtubeId: 'PkZNo7MFNFg',
    title: 'Learn JavaScript - Full Course for Beginners',
    description: 'This complete 134-part JavaScript tutorial for beginners will teach you everything you need to know to get started with the JavaScript programming language.',
    tags: ['プログラミング', 'JavaScript', 'Web開発'],
    instructor: 'FreeCodeCamp',
    duration: '3:26:42',
  },
  {
    id: '6',
    youtubeId: '8hly31xKli0',
    title: 'Algorithms and Data Structures Tutorial - Full Course for Beginners',
    description: 'In this course you will learn about algorithms and data structures, two of the fundamental topics in computer science. There are three main parts to this course: algorithms, data structures, and a deep dive into sorting and searching algorithms.',
    tags: ['プログラミング', 'アルゴリズム', 'データ構造'],
    instructor: 'FreeCodeCamp',
    duration: '5:22:07',
  },
  {
    id: '7',
    youtubeId: 'WGJJIrtnfpk',
    title: 'SQL Full Database Course for Beginners',
    description: 'In this course, we will explore database management basics and SQL using the MySQL RDBMS. The course is designed for beginners to SQL and database management systems.',
    tags: ['データベース', 'SQL', '社内整備'],
    instructor: 'FreeCodeCamp',
    duration: '4:20:02',
  },
  {
    id: '8',
    youtubeId: 'aS8gJirMTu4',
    title: 'ChatGPT Tutorial for Developers - 38 Ways to 10x Your Productivity',
    description: 'Learn how to use ChatGPT to 10x your productivity as a developer. You will learn 38 different use cases for improving your productivity with ChatGPT and other AI tools.',
    tags: ['AI活用', '生産性向上', 'ChatGPT'],
    instructor: 'Programming with Mosh',
    duration: '1:47:23',
  },
];

export function getYouTubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

export function getYouTubeVideoById(id: string): YouTubeVideo | undefined {
  return youtubeVideos.find(video => video.id === id);
}