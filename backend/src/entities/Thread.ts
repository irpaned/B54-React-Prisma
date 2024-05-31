import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from "typeorm";

@Entity({name: "threads"}) // kalau kita ga isi name maka secara default menamakan sesuai dgn class bawahnya yaitu Thread 
export class Thread {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({nullable: true }) // {nullable: true } : user tidak wajib menambahkan iamge
    image: string

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    create_at: Date

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    posted_at: Date

}