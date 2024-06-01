// import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from "typeorm";

// // kalau kita ga isi name maka secara default menamakan sesuai dgn class bawahnya yaitu Thread
// @Entity({name: "threads"})  
// export class Thread {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     content: string

//      // {nullable: true } : user tidak wajib menambahkan iamge
//     @Column({nullable: true }) 
//     image: string

//     @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
//     create_at: Date

//     @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
//     posted_at: Date

// }