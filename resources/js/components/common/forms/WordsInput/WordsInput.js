import React, { useState } from 'react';
import WordItem from './WordItem/WordItem';

export default function WordsInput({
    placeholder,
    addedWords,
    wordsChanged,
    pending,
}) {
    const [wordTyped, setWordTyped] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            wordsChanged([
                ...(addedWords || []),
                wordTyped,
            ]);
            setWordTyped('');
        }
    };

    const wordRemoved = (removedWord) => {
        wordsChanged(addedWords.filter((word) => word !== removedWord));
    };

    const wordInputChanged = (event) => {
        setWordTyped(event.target.value);
    };

    return (
        <div className="row">
            <div className="container">
                <div className="col-12 col-lg-12 m-bot-1 libertas-green multi-select flex-wrap d-flex align-items-center">
                    {addedWords && addedWords.map((value) => (
                        <WordItem value={value} wordRemovedListener={wordRemoved} />
                    ))}
                    {
                        pending && (
                            <div className="spinner-border mr-1" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )
                    }
                    <input
                        type="text"
                        className="form-control words-input-input col-5 col-md-3 d-inline-flex"
                        placeholder={placeholder}
                        onChange={wordInputChanged}
                        onKeyDown={handleKeyDown}
                        value={wordTyped}
                    />
                </div>
            </div>
        </div>
    );
}
