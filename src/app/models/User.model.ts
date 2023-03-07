import { BelongsTo, BelongsToMany, Column, CreatedAt, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import { DoubleDataType, FloatDataType } from "sequelize/types";
import { Col } from "sequelize/types/utils";


@Table({
    tableName: 'users'
})

export class User extends Model {
    @Column({primaryKey: true, autoIncrement: true})
    id: number

    @Column
    platform_id: number

    @Column
    first_name: string

    @Column
    last_name: string

    @Column
    role_id: string

    @Column
    username: string

    @Column
    description: string

    @Column
    company: string

    @Column
    website: string

    @Column
    position: string

    @Column
    linkedin: string

    @Column
    address: string

    @Column
    password: string

    @Column
    email: string

    @Column
    image: string

    @Column
    status: number

    @Column
    tokenhash: string

    @Column
    password_token: string

    @UpdatedAt
    last_login: Date

    @Column
    is_online: number


    @Column
    phone: string

    @Column
    department: string

    @Column
    notification_count: string

    @Column
    most_viewed_category: string

    @Column
    fcm_token: string

    @Column
    f_code: string

    @Column
    is_access: string

    @Column
    is_stats: string

    @Column
    city: string

    @Column
    salutation: string

    @Column
    email_send_date: string

    @Column
    scoreVal: string

    @Column
    is_delete: string

    @Column
    marketing_consent: string

    @Column
    timezone: string

    @Column
    therapeutic_area: string

    @Column
    signup_verification_token: string

    @CreatedAt
    created: Date;

    @UpdatedAt
    modified: Date;

    @Column
    publisher_id: Number

}