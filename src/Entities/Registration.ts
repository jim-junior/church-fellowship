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

    @Column({
        nullable: true,
        default: null
    })
    ref: string;

    @Column()
    is_mother: boolean;

    @Column()
    children: number;

    @Column({unique: true})
    registration_ref: string;

    @Column()
    password: string;

    @Column({
        nullable: true
    })
    device_id: string;

    @Column({
        default: false,
    })
    approved: boolean;
}

export const createSixDigitCode = () => {
    let code = Math.floor(100000 + Math.random() * 900000);
    return code;
}

export const createNewRegistration = async (
    full_name: string,
    phone_number: string,
    email: string,
    is_mother: boolean,
    children: number,
    password: string,
    ref: string = "",
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
    createRegistration.password = password
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
            reg.children,
            reg.password
        );
        reg.approved = true
        await reg.save()
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

export const getUnApprovedRegistration = async () => {
    const registrations = await Registration.find({
        where: {
            approved: false
        }
    })

    return registrations
}

export const getRegistrationByEmail = async (email: string) => {
    return await Registration.findOne({
        where: {
            email: email
        }
    })
}