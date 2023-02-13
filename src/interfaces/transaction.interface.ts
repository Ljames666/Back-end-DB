export default interface ITransaction {
    uid: string;
    trans_value: number;
    trans_type: 'income' | 'outcome';
    account_id: string;
    created_at: Date;
    updated_at: Date;
}
