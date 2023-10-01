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

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    phone_number: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    ref: string;

    @Column()
    is_mother: boolean;

    @Column()
    children: number;

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions: Transaction[];
}

export const createUser = async (
    full_name: string,
    phone_number: string,
    email: string,
    ref: string,
    is_mother: boolean,
    children: number
) => {
    const createUser = new User();
    createUser.full_name = full_name;
    createUser.phone_number = phone_number;
    createUser.email = email;
    createUser.ref = ref;
    createUser.is_mother = is_mother;
    createUser.children = children;
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

