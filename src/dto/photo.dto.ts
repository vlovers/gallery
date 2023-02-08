export interface PhotoDto {
  id: string;
  urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
  };
  user: {
    first_name: string,
    last_name: string;
    profile_image: { 
      small: string 
    }
  };
}
