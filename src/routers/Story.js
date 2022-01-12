import * as React from 'react';

export default function Story({ title, subject, story, key_source, msid }) {
    return
    (
        <div>
            <h1>{title}</h1>
            <p>{subject}</p>
            {story}
        </div>
    );
}