// import bordalsgjeletVideo from "~shared/assets/bordalsgjelet.mp4";
// import gameOfThronesVideo from "~shared/assets/game-of-thrones-meme.mp4";
// import geirangerfjordVideo from "~shared/assets/geirangerfjord.mp4";
// import japanTempleVideo from "~shared/assets/japan-temple.mp4";
// import miyazakiJapanVideo from "~shared/assets/miyazaki-japan.mp4";
// import norwayVideo from "~shared/assets/norway.mp4";

export type FeedPost = {
  id: string;
  username: string;
  isVerified: boolean;
  subtitle: string;
  caption: string;
  dateLabel: string;
  likesLabel: string;
  commentsLabel: string;
  sharesLabel: string;
  savesLabel: string;
  likedByLabel: string;
  likedByDetailed: string;
  avatarLabel: string;
  audioLabel: string;
  reelsCaption: string;
  videoSource: number;
};

export const FEED_POSTS: FeedPost[] = [];
//   {
//     id: "norway-stave-church",
//     username: "dreamtravelvoyages",
//     isVerified: true,
//     subtitle: "Рекомендации для вас",
//     caption:
//       "BORGUND STAVE CHURCH · NORWAY — одно из самых сохранившихся деревянных храмов страны.",
//     dateLabel: "8 апреля",
//     likesLabel: "203 тыс.",
//     commentsLabel: "460",
//     sharesLabel: "5 201",
//     savesLabel: "36 тыс.",
//     likedByLabel: "Нравится aleksmadisson и другим",
//     likedByDetailed: "Нравится aleksmadisson и ещё 203 838",
//     avatarLabel: "D",
//     audioLabel: "Eivør · Trøllabundin (Live…",
//     reelsCaption:
//       "This place feels straight out of a Viking movie ⚔️ …",
//     videoSource: norwayVideo,
//   },
//   {
//     id: "geirangerfjord",
//     username: "nordicframes",
//     isVerified: true,
//     subtitle: "Рекомендации для вас",
//     caption:
//       "Geirangerfjord — один из самых глубоких фьордов Норвегии. Водопады срываются прямо в воду.",
//     dateLabel: "5 апреля",
//     likesLabel: "128 тыс.",
//     commentsLabel: "892",
//     sharesLabel: "3 410",
//     savesLabel: "22 тыс.",
//     likedByLabel: "Нравится travelnotes и другим",
//     likedByDetailed: "Нравится travelnotes и ещё 128 004",
//     avatarLabel: "N",
//     audioLabel: "Hans Zimmer · Time (Piano Cover)",
//     reelsCaption:
//       "Seven Sisters waterfall from the fjord — unreal morning light.",
//     videoSource: geirangerfjordVideo,
//   },
//   {
//     id: "bordalsgjelet",
//     username: "voss.nature",
//     isVerified: false,
//     subtitle: "Рекомендации для вас",
//     caption:
//       "Bordalsgjelet — узкое ущелье у Восса: река прорезает скалы, а над головой остаётся полоска неба.",
//     dateLabel: "1 апреля",
//     likesLabel: "34,7 тыс.",
//     commentsLabel: "187",
//     sharesLabel: "960",
//     savesLabel: "6,4 тыс.",
//     likedByLabel: "Нравится hike_norway и другим",
//     likedByDetailed: "Нравится hike_norway и ещё 34 691",
//     avatarLabel: "V",
//     audioLabel: "Ambient · River Gorge",
//     reelsCaption:
//       "The gorge is narrow, loud, and absolutely worth the hike.",
//     videoSource: bordalsgjeletVideo,
//   },
//   {
//     id: "game-of-thrones-meme",
//     username: "got.cutroom",
//     isVerified: false,
//     subtitle: "Подписаны: throne_daily, westeros.clips",
//     caption:
//       "«Сильные угнетают слабых» — цитата, которую вы точно слышали хотя бы раз. Классика Game of Thrones.",
//     dateLabel: "28 марта",
//     likesLabel: "512 тыс.",
//     commentsLabel: "4 802",
//     sharesLabel: "89 тыс.",
//     savesLabel: "71 тыс.",
//     likedByLabel: "Нравится westeros.clips и другим",
//     likedByDetailed: "Нравится westeros.clips и ещё 512 318",
//     avatarLabel: "G",
//     audioLabel: "Ramin Djawadi · Game of Thrones Theme",
//     reelsCaption:
//       "When the quote hits different every rewatch 🐺",
//     videoSource: gameOfThronesVideo,
//   },
//   {
//     id: "japan-temple",
//     username: "zen.paths",
//     isVerified: true,
//     subtitle: "Рекомендации для вас",
//     caption:
//       "Храм на рассвете — благовония, каменные ступени и тишина, которую слышно между кадрами.",
//     dateLabel: "22 марта",
//     likesLabel: "96,3 тыс.",
//     commentsLabel: "541",
//     sharesLabel: "2 780",
//     savesLabel: "18 тыс.",
//     likedByLabel: "Нравится kyoto.walks и другим",
//     likedByDetailed: "Нравится kyoto.walks и ещё 96 287",
//     avatarLabel: "Z",
//     audioLabel: "Koto · Morning Temple",
//     reelsCaption:
//       "Golden hour at the temple gate — no filter needed.",
//     videoSource: japanTempleVideo,
//   },
//   {
//     id: "miyazaki-japan",
//     username: "ghibli.roads",
//     isVerified: true,
//     subtitle: "Рекомендации для вас",
//     caption:
//       "Miyazaki, Япония — зелёные холмы, туман и дорога, будто вышедшая из кадра Studio Ghibli.",
//     dateLabel: "15 марта",
//     likesLabel: "174 тыс.",
//     commentsLabel: "1 203",
//     sharesLabel: "6 890",
//     savesLabel: "41 тыс.",
//     likedByLabel: "Нравится anime.travel и другим",
//     likedByDetailed: "Нравится anime.travel и ещё 174 022",
//     avatarLabel: "M",
//     audioLabel: "Joe Hisaishi · Merry Go Round of Life",
//     reelsCaption:
//       "Real life or Ghibli background? Miyazaki prefecture hits different.",
//     videoSource: miyazakiJapanVideo,
//   },
// ];

export function getFeedPostById(postId: string): FeedPost | undefined {
  return FEED_POSTS.find((post) => post.id === postId);
}

export function getFeedPostIndex(postId: string): number {
  const index = FEED_POSTS.findIndex((post) => post.id === postId);
  return index >= 0 ? index : 0;
}
