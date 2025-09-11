import { EmptyContainer, EmptyMessage } from "./style"
import Empty from '../../../assets/emptyBuddy.svg';

export const EmptyState = () => {
    return (
        <EmptyContainer>
            <img src={Empty} />
            <EmptyMessage>
                아직 보유한 상품권이 없어요.
            </EmptyMessage>
        </EmptyContainer>
    )
};