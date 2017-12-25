import React from 'react';

const FileDrop = () => (
    <section className="holder">
        <div className="action-section droparea">
            <div className="droparea-body">
                <h2>Drop your files</h2>
                <p>Drag & drop your files here or click to browse. Up to 1GB.</p>
            </div>
        </div>
        <button className="action-section button primary medium" type="submit">Transfer & Share</button>
    </section>
);

export default FileDrop;
