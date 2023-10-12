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
import { Meeting } from "./Meeting";
import { Message } from "./Message";
import { Note } from "./Notes";
import { Staff } from "./Staff";



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

    @OneToMany(() => Message, message => message.sender)
    sent_messages: Message[];

    @OneToMany(() => Message, message => message.reciever)
    recieved_messages: Message[];

    @OneToMany(() => Note, note => note.user)
    notes: Note[];

    @Column({
        nullable: true,
        select: false
    })
    reset_token: string;

    @OneToOne(() => Staff, staff => staff.userAccount, {
        nullable: true,
        eager: true
    })
    @JoinColumn()
    staffAccount: Staff;


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

export const updateProfilePicture = async (id: number, profile_picture: string) => {
    const user = await User.findOne({
        where: {
            id
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    user.profile_picture = profile_picture;
    await user.save();

    return user;
}

export const getRessetToken = async (email: string) => {
    const user = await User.findOne({
        where: {
            email
        },
        select: ["reset_token"]
    })

    if (!user) {
        throw new Error("User not found")
    }

    return user.reset_token;
}

export const generateSixDigitCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

export const updateResetToken = async (email: string) => {
    const user = await User.findOne({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    user.reset_token = generateSixDigitCode().toString();
    await user.save();

    return user.reset_token;
}

export const updatePassword = async (email: string, password: string) => {
    const user = await User.findOne({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    user.password = password;
    await user.save();

    return user;
}

