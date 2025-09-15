import { CommentInputForm, CommentInputTrigger, CommentInputWrapper, CommentSubmit } from "./style";
import { FaArrowUp } from "react-icons/fa6";

interface CommentFormProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (text: string) => void;
  onFocus?: () => void;
}

const CommentInput = ({ value, onChange, onSubmit, onFocus }: CommentFormProps) => {
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!value.trim()) return;
        onSubmit(value.trim());
    };

    const isActive = value.trim() !== '';

    return (
        <CommentInputWrapper>
            <CommentInputForm onSubmit={handleFormSubmit}>
                <CommentInputTrigger 
                    type="text"
                    placeholder="댓글을 달아주세요."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={onFocus}
                />
            <CommentSubmit type='submit' data-active={isActive}>
                <FaArrowUp fill="#F6F6F9" size={24} />
            </CommentSubmit>
            </CommentInputForm>
        </CommentInputWrapper>
    )
};

export default CommentInput;