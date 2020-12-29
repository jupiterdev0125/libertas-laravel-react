import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import AutoModerationCard from './AutoModerationCard/AutoModerationCard';
import InputLargeLabel from '../../common/forms/InputLargeLabel/InputLargeLabel';
import WordsInput from '../../common/forms/WordsInput/WordsInput';
import Counter from '../../common/forms/Counter/Counter';
import {
    selectBadWordsCommand,
    selectExcessiveEmojisCommand,
    selectExcessiveMentionsCommand,
    selectExcessiveSpoilersCommand,
    selectExternalLinksCommand,
    updateAutoModerationCommand,
} from '../../../store/moderation/autoModerationSlice';

export default function AutoModeration() {
    const dispatch = useDispatch();

    const [selectedCommand, setSelectedCommand] = useState('');
    const badWordsCommand = useSelector(selectBadWordsCommand);
    const externalLinksCommand = useSelector(selectExternalLinksCommand);
    const excessiveEmojisCommand = useSelector(selectExcessiveEmojisCommand);
    const excessiveSpoilersCommand = useSelector(selectExcessiveSpoilersCommand);
    const excessiveMentionsCommand = useSelector(selectExcessiveMentionsCommand);

    const handleExpandCommand = (command) => {
        if (command === selectedCommand) {
            setSelectedCommand('');
        } else {
            setSelectedCommand(command);
        }
    };

    const badWordsListChanged = (words) => {
        dispatch(updateAutoModerationCommand({
            ...badWordsCommand,
            bad_words: words,
        }));
    };

    const externalLinksListChanged = (words) => {
        dispatch(updateAutoModerationCommand({
            ...externalLinksCommand,
            external_links: words,
        }));
    };

    const excessiveEmojisLimitChanged = (limit) => {
        dispatch(updateAutoModerationCommand({
            ...excessiveEmojisCommand,
            limit,
        }));
    };

    const excessiveSpoilersLimitChanged = (limit) => {
        dispatch(updateAutoModerationCommand({
            ...excessiveSpoilersCommand,
            limit,
        }));
    };

    const excessiveMentionsLimitChanged = (limit) => {
        dispatch(updateAutoModerationCommand({
            ...excessiveMentionsCommand,
            limit,
        }));
    };

    return (
        <>
            <SectionHeader title="Auto-Moderation" withHelpIcon />

            <AutoModerationCard
                selectedCommand={selectedCommand}
                handleExpandCommand={handleExpandCommand}
                command="bad_words"
                commandName="Bad words"
                additionalInputComponent={(
                    <>
                        <InputLargeLabel text="Bad words list" />
                        <WordsInput
                            placeholder="Add a word"
                            addedWords={badWordsCommand.bad_words}
                            wordsChanged={badWordsListChanged}
                        />
                    </>
                )}
            />
            <AutoModerationCard
                selectedCommand={selectedCommand}
                handleExpandCommand={handleExpandCommand}
                command="repeated_text"
                commandName="Repeated text"
            />
            <AutoModerationCard
                selectedCommand={selectedCommand}
                handleExpandCommand={handleExpandCommand}
                command="server_invites"
                commandName="Server Invites"
            />
            <AutoModerationCard
                selectedCommand={selectedCommand}
                handleExpandCommand={handleExpandCommand}
                command="external_links"
                commandName="External Links"
                additionalInputComponent={(
                    <>
                        <InputLargeLabel text="Allowed Links List" />
                        <WordsInput
                            placeholder="Allowed Links"
                            addedWords={externalLinksCommand.external_links}
                            wordsChanged={externalLinksListChanged}
                        />
                    </>
                )}
            />
            <AutoModerationCard
                selectedCommand={selectedCommand}
                handleExpandCommand={handleExpandCommand}
                command="excessive_caps"
                commandName="excessive caps"
            />
            <AutoModerationCard
                selectedCommand={selectedCommand}
                handleExpandCommand={handleExpandCommand}
                command="excessive_emojis"
                commandName="Excessive emojis"
                additionalInputComponent={(
                    <>
                        <InputLargeLabel text="Limit" />
                        <Counter
                            value={excessiveEmojisCommand.limit || 0}
                            max={9999999}
                            min={0}
                            updateListener={excessiveEmojisLimitChanged}
                        />
                    </>
                )}
            />
            <AutoModerationCard
                selectedCommand={selectedCommand}
                handleExpandCommand={handleExpandCommand}
                command="excessive_spoilers"
                commandName="Excessive spoilers"
                additionalInputComponent={(
                    <>
                        <InputLargeLabel text="Limit" />
                        <Counter
                            value={excessiveSpoilersCommand.limit || 0}
                            max={9999999}
                            min={0}
                            updateListener={excessiveSpoilersLimitChanged}
                        />
                    </>
                )}
            />
            <AutoModerationCard
                selectedCommand={selectedCommand}
                handleExpandCommand={handleExpandCommand}
                command="excessive_mentions"
                commandName="Excessive mentions"
                additionalInputComponent={(
                    <>
                        <InputLargeLabel text="Limit" />
                        <Counter
                            value={excessiveMentionsCommand.limit || 0}
                            max={9999999}
                            min={0}
                            updateListener={excessiveMentionsLimitChanged}
                        />
                    </>
                )}
            />
            <AutoModerationCard
                selectedCommand={selectedCommand}
                handleExpandCommand={handleExpandCommand}
                command="zalgo"
                commandName="zalgo"
            />
        </>
    );
}
