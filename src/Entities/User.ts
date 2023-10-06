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
import { Transaction } from "./Transaction";
import { PrayerRequest } from "./PrayerRequest";
import { Testimony } from "./Testimony";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    phone_number: string;

    @Column({
        unique: true
    })
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    ref: string;

    @Column()
    is_mother: boolean;

    @Column()
    children: number;

    @Column({
        select: false
    })
    password: string;

    @Column({
        nullable: true
    })
    profile_picture: string;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];

    @OneToMany(() => PrayerRequest, prayerRequest => prayerRequest.user)
    prayerRequests: PrayerRequest[];

    @OneToMany(() => Testimony, testimony => testimony.user)
    testimonies: Testimony[];
}

export const createUser = async (
    full_name: string,
    phone_number: string,
    email: string,
    ref: string,
    is_mother: boolean,
    children: number,
    password: string,
) => {
    const createUser = new User();
    createUser.full_name = full_name;
    createUser.phone_number = phone_number;
    createUser.email = email;
    createUser.ref = ref;
    createUser.is_mother = is_mother;
    createUser.children = children;
    createUser.password = password
    await createUser.save();
    return createUser;
}

export const getAllUsers = async () => {
    const allUsers = await User.find();
    return allUsers;
}


export const getUserById = async (id: number) => {
    const user = User.findOne( {
        where: {
            id
        }
    });
    return user;
}

export const getUserByEmail = async (email: string) => {
    const user = User.findOne({
        where: {
            email: email
        }
    })

    return user
}

export const getUserPassword = async (email: string) => {
  return await User.findOne({ where: { email: email }, select: ["password"] });
}