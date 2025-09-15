import { useState } from "react";
import { SearchIcon, SearchInput, SearchWrapper } from "../style";

const PostSearch = () => {
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        // TODO: 검색 API 호출 
    };

    return (
        <div style={{ padding: '10px 20px' }}>
            <SearchWrapper>
                <SearchIcon size={20}/>
                <SearchInput 
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="검색어를 입력해주세요."
                />
            </SearchWrapper>
        </div>
    )
};

export default PostSearch;