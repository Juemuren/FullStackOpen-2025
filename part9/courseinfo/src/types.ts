export interface HeaderProps {
  courseName: string;
}

export interface PartProps {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  parts: PartProps[];
}

export interface TotalProps {
  parts: PartProps[];
}
