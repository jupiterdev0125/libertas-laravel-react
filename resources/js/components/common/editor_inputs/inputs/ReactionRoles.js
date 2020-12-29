import React from 'react';
import RoleInput from './RoleInput/RoleInput';
import { EmojiPicker } from '../../EmojiDropdown/EmojiDropdown';
import { useEmojis } from '../../../../customHooks/useEmojis';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';
import { useRoles } from '../../../../customHooks/useRoles';

export default function ReactionRoles({
    guildId, guildName, value, setValue,
}) {
    const [emojis] = useEmojis(guildId);
    const [roles] = useRoles(guildId);

    return (
        <div className="row m-top-1">
            <div className="col-12 col-lg-3 pb-md-3 pb-0 my-auto">
                <p className="vertical-middle">Reaction</p>
            </div>
            <div className="col-12 col-lg-9 m-bot-1">
                {emojis !== undefined ? (
                    <EmojiPicker
                        customEmojis={emojis}
                        guildName={guildName}
                        emoji={value.reaction}
                        setEmoji={(emoji) => setValue({
                            ...value,
                            reaction: emoji,
                        })}
                    />
                ) : (
                    <LoadingIndicator isLoaded={false} />
                )}
            </div>
            <div className="col-12 col-lg-3 pb-md-3 pb-0 my-auto">
                <p className="vertical-middle">Roles</p>
            </div>
            <div className="col-12 col-lg-9 m-bot-1">
                <RoleInput
                    roles={value.roles || []}
                    addableRoles={roles}
                    setRoles={(roles) => setValue({
                        ...value,
                        roles,
                    })}
                />
            </div>
        </div>
    );
}
