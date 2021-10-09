export interface ITeam {
  shortid: string;
  name: string;
  images: ITeamImage[];
}

export interface ITeamImage {
  id: number;
  width: number;
  height: number;
  name: string;
  filename: string;
  created_at: string;
  base64: string;
}

export interface ITeamImageWithSrc extends ITeamImage {
  src: string;
}
