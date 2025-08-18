export interface CreateNewsDTO {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  releaseDate: string;
  publisher: string;
  category?: string;
}

export interface UpdateNewsDTO extends Partial<CreateNewsDTO> {}
