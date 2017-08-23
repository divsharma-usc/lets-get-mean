export class vedios{
  vedio_title: string;
  vedio_url: string;
}
export class course{
  course_id: string;
  title: string;
  description: string;
  author: string;
  no_of_vedios: number;
  vedios_link:vedios[];
}
