import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    Generated,
    CreateDateColumn
} from "typeorm";

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  sub_title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  image: string;

  @Column()
  location: string;

  @CreateDateColumn()
  created_at: Date;

}

export const createNews = async (
  title: string,
  sub_title: string,
  description: string,
  date: Date,
  image: string,
  location: string
) => {
  const newNews = new News();
  newNews.title = title;
  newNews.sub_title = sub_title;
  newNews.description = description;
  newNews.date = date;
  newNews.image = image;
  newNews.location = location;

  await newNews.save();

  return newNews;
}

export const getNews = async () => {
  const news = await News.find({
    order: {
      created_at: "DESC"
    }
  });

  return news;
}

export const getLatestNews = async () => {
  const news = await News.find({
    order: {
      created_at: "DESC"
    },
    take: 3
  });

  return news;
}
