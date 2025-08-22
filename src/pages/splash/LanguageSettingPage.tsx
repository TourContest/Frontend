import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "src/components/splash/LanguageSelector";

const LanguageSelectorPage = () => {
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState('');

    const handleSubmit = () => {
        if(!selectedLang) return;
        navigate('/splash/register-choice');
    };

    return <LanguageSelector onSelect={setSelectedLang} selected={selectedLang} onSubmit={handleSubmit} />
};

export default LanguageSelectorPage;