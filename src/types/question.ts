import colorIcons from "@/components/common/icons/color-icons";
import icons from "@/components/common/icons/icons";

export interface QuestionContent {
  questionId: number;
  category: string;
  content: string;
  authorNickname: string;
}

export interface Reply {
  replyId: number;
  questionContent: string;
  questionerNickname: string;
  questionAt: string;
  replyContent: string;
  replierNickname: string;
  replyAt: string;
  reactionType: string;
  goodTypes: string;
  thankMessage: string;
}

export interface List {
  replyId: number;
  replyAt: string;
  questionCategory: string;
}

export const categories = [
  {
    id: 1,
    name: "공부",
    encodedName: "STUDY",
    colorIcon: colorIcons.Pencil,
    icon: icons.Pencil,
  },
  {
    id: 2,
    name: "취업",
    encodedName: "EMPLOYMENT",
    colorIcon: colorIcons.Picture,
    icon: icons.Picture,
  },
  {
    id: 3,
    name: "직장",
    encodedName: "WORKPLACE",
    colorIcon: colorIcons.Briefcase,
    icon: icons.Briefcase,
  },
  {
    id: 4,
    name: "진로",
    encodedName: "CAREER",
    colorIcon: colorIcons.Watch,
    icon: icons.Watch,
  },
  {
    id: 5,
    name: "연애",
    encodedName: "ROMANCE",
    colorIcon: colorIcons.Heart,
    icon: icons.Heart,
  },
  {
    id: 6,
    name: "결혼",
    encodedName: "MARRIAGE",
    colorIcon: colorIcons.Hearts,
    icon: icons.Hearts,
  },
  {
    id: 7,
    name: "가족",
    encodedName: "FAMILY",
    colorIcon: colorIcons.House,
    icon: icons.House,
  },
  {
    id: 8,
    name: "인간관계",
    encodedName: "RELATIONSHIP",
    colorIcon: colorIcons.Users,
    icon: icons.Users,
  },
  {
    id: 9,
    name: "자기자신",
    encodedName: "SELF",
    colorIcon: colorIcons.Profile,
    icon: icons.Profile,
  },
  {
    id: 10,
    name: "기타",
    encodedName: "ETC",
    colorIcon: colorIcons.More,
    icon: icons.More,
  },
];
