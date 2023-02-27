import React from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';

export default function NotFound() {
    return (
        <>
            <PageMetadata title={'Page Not Found'} />
            <Layout>
                <main className="container margin-vert--xl">
                    <div className="row">
                        <div className="col col--6 col--offset-3">
                            <h1 className="hero__title">
                                Page Not Found
                            </h1>
                            <p>
                                We could not find what you were looking for 😢
                            </p>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}
