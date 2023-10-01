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
import { User, createUser } from "./User";


@Entity()
export class Registration extends BaseEntity {
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

    @Column({unique: true})
    registration_ref: string;

    @Column()
    device_id: string;
}

export const createSixDigitCode = () => {
    let code = Math.floor(100000 + Math.random() * 900000);
    return code;
}

export const createNewRegistration = async (
    full_name: string,
    phone_number: string,
    email: string,
    ref: string,
    is_mother: boolean,
    children: number,
    device_id: string = ""
) => {
    const createRegistration = new Registration();
    createRegistration.full_name = full_name;
    createRegistration.phone_number = phone_number;
    createRegistration.email = email;
    createRegistration.ref = ref;
    createRegistration.is_mother = is_mother;
    createRegistration.children = children;
    createRegistration.registration_ref = createSixDigitCode().toString();
    createRegistration.device_id = device_id;
    await createRegistration.save();
    return createRegistration;
}

export const createUserFromRegistration = async (
    registration_ref: string
) => {
    const reg = await Registration.findOne({
        where: {
            registration_ref
        }
    });

    if (reg) {
        const user = await createUser(
            reg.full_name,
            reg.phone_number,
            reg.email,
            reg.ref,
            reg.is_mother,
            reg.children
        );
        return user;
    } else {
        return null;
    }
}

export const getRegistrationByRef = async (registration_ref: string) => {
    const registration = await Registration.findOne({
        where: {
            registration_ref
        }
    });
    return registration;
}