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
import { User } from "./User";

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // transaction ref UUID
    @Column({unique: true})
    @Generated("uuid")
    tx_ref: string;

    @Column()
    amount: number;

    @Column()
    currency: string;

    @Column()
    transaction_type: string;

    @Column()
    status: string;

    @Column()
    network: string;

    @Column()
    phone_number: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    reason: string;

    @ManyToOne(() => User, user => user.transactions, {
        eager: true
    })
    @JoinColumn()
    user: User;

    @Column({
        nullable: true
    })
    device_id: string;

    @Column({
        nullable: true
    })
    order_id: string;

}

export const createMMTransaction = async (
    userid: number,
    amount: number,
    transaction_type: string,
    phone_number: string,
    email: string,
    reason: string,
    network: string,
    device_id: string | null = null,
    currency: string = "UGX"
) => {
    const user = await  User.findOne({
        where: {
            id: userid
        }
    });

    if (user === null) {
        throw new Error("User not found");
    }


    const createTransaction = new Transaction();
    createTransaction.amount = amount;
    createTransaction.currency = currency;
    createTransaction.transaction_type = transaction_type;
    createTransaction.network = network;
    createTransaction.phone_number = phone_number;
    createTransaction.email = email;
    createTransaction.reason = reason;
    createTransaction.user = user;
    if (device_id) {
        createTransaction.device_id = device_id
    }
    await createTransaction.save();
    return createTransaction;
}

export const getTransactionByTxRef =  async (tx_ref: string) => {
    const trans = await Transaction.findOne({
        where: {
            tx_ref
        }
    })

    return trans
}

export const getAllSuccessfulTransactions = async () => {
    const trans = await Transaction.find({
        where: {
            status: "success"
        },
        relations: ["user"]
    })

    return trans
}