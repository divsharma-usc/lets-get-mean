export class Vedios{
  vedio_title: string;
  vedio_url: string;
}
export class Course{
  course_id: string;
  title: string;
  description: string;
  author: string;
  no_of_vedios: number;
  vedios_links:Vedios[];
}
