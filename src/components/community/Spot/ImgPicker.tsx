import { GoPlus } from "react-icons/go";
import { AddCard, Img, ImgBox, SlideWrapper, Thumb } from "./style";
import { useRef } from "react";
import type { ImgPickerProps } from "../types";

export default function ImgPicker({ images, onChange } : ImgPickerProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleAddClick = () => fileRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        const url = URL.createObjectURL(file);

        const next = [...images, file].slice(0, 3);
        onChange(next);

        requestAnimationFrame(() => {
            scrollRef.current?.scrollTo({
                left: scrollRef.current.scrollWidth,
                behavior: 'smooth'
            });
        });

        e.target.value = "";
    };

    const handleRemove = (idx: number) => {
        onChange(images.filter((_, i) => i !== idx));
    }
    

    return(
        <>
            <SlideWrapper>
                {images.length < 3 && (
                    <AddCard
                        data-last={images.length === 2}
                        onClick={handleAddClick}
                    >
                        <GoPlus fill="#b7b7b7" size={32} />
                        <span>{images.length}/3</span>
                    </AddCard>
                )}

                {images.map((file, idx) => (
                    <Thumb
                        key={idx}
                        data-last={idx === images.length -1}
                        onClick={() => handleRemove(idx)}
                    >
                        <ImgBox>
                            <Img src={URL.createObjectURL(file)}/>
                        </ImgBox>
                    </Thumb>
                ))}

                <input 
                    ref={fileRef}
                    type="file"
                    accept="images/*"
                    hidden
                    onChange={handleFileChange}
                />
            </SlideWrapper>
        </>
    )
};