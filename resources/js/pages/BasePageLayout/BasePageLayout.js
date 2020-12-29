import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader/PageHeader';
import BasePageInput from './BasePageInput';
import BasePageOverview from './BasePageOverview';

export default function BasePageLayout({
    entries, config, pageTitle, pageType, entryTypeName,
}) {
    const [entriesState, setEntriesState] = useState(entries);
    // eslint-disable-next-line operator-linebreak
    const validators =
        config.validators?.map((validator) => (values) => validator(values, entriesState)) || [];
    return (
        <div className="container m-bot-4">
            <PageHeader config={config} pageTitle={pageTitle} pageType={pageType} />
            <BasePageInput
                validators={validators}
                config={config}
                entries={entriesState}
                setEntries={setEntriesState}
                pageType={pageType}
            />
            <BasePageOverview
                entryTypeName={entryTypeName}
                overviewTitle={pageTitle}
                pageType={pageType}
                validators={validators}
                config={config}
                entries={entriesState}
                setEntries={setEntriesState}
            />
        </div>
    );
}
