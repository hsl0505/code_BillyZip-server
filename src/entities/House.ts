import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

// User에서 만든 type plan 재활용
import { Amenity } from './Amenity';
import { Image } from './Image';
import { Review } from './Review';
import { plan, User } from '../entities/User';
import { Favorite } from './Favorite';
import { Application } from './Application';
export type houseType =
  | 'oneroom'
  | 'dandok'
  | 'apart'
  | 'villa'
  | 'offietel'
  | 'rest';
export type houseYear = '1' | '3' | '5' | '10' | '15' | '20' | '30' | 'rest';

@Entity()
export class House extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  plan!: plan;

  @Column()
  type!: houseType;

  @Column()
  year!: houseYear;

  @Column({ type: 'varchar' })
  access!: plan;

  @Column({ type: 'boolean' })
  status!: boolean;

  @Column({ type: 'boolean' })
  display!: boolean;

  @Column({ nullable: true })
  startTime!: string;

  @Column({ nullable: true })
  endTime!: string;

  @Column({ type: 'point' })
  location!: string;

  @Column()
  adminDistrict!: string;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  houseRule!: string;

  @Column({ type: 'boolean' })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // House(1) <-> Amenity(1)
  @OneToOne((type) => Amenity, { nullable: false })
  @JoinColumn()
  amenity!: Amenity;

  // House(1) <-> Image(*)
  @OneToMany(
    (type) => Image,
    (image) => image.house,
  )
  images!: Image[];

  // House(1) <-> Review(*)
  @OneToMany(
    (type) => Review,
    (review) => review.house,
  )
  reviews!: Review[];

  // House(1) <-> Favorite(*)
  @OneToMany(
    (type) => Favorite,
    (favorite) => favorite.house,
  )
  favorites!: Favorite[];

  // House(1) <-> Application(*)
  @OneToMany(
    (type) => Application,
    (application) => application.house,
  )
  applications!: Application[];

  // User(1) <-> House(*)
  @ManyToOne(
    (type) => User,
    (user) => user.houses,
    { nullable: false },
  )
  user!: User;
}
