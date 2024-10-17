import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ROLE } from "../constants";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 20, nullable: true })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({})
  password: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  paymentInfo: string;

  @Column({ type: "enum", enum: ROLE })
  role: ROLE;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  // @OneToOne(
  //   () => MVendorEntity,
  //   (mVendor) => mVendor.mAccountOfficeCustom,
  // )
  // mVendorCustom: MVendorEntity;

  // @ManyToOne(
  //   () => MCompanyEntity,
  //   (mCompany) => mCompany.mAccountOffice,
  // )
  // @JoinColumn({ name: "company_id", referencedColumnName: "id" })
  // mCompany: MCompanyEntity;

  // @OneToMany(
  //   () => AdminUserCompanyRelationOfficeEntity,
  //   (adminUserCompanyRelationOffice) => adminUserCompanyRelationOffice.mAccountOffice,
  // )
  // adminUserCompanyRelationOffice: AdminUserCompanyRelationOfficeEntity[];
}
