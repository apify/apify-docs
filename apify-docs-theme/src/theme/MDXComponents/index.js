import Admonition from '@theme/Admonition';
import MDXA from '@theme/MDXComponents/A';
import MDXCode from '@theme/MDXComponents/Code';
import MDXDetails from '@theme/MDXComponents/Details';
import MDXHead from '@theme/MDXComponents/Head';
import MDXHeading from '@theme/MDXComponents/Heading';
import MDXImg from '@theme/MDXComponents/Img';
import MDXPre from '@theme/MDXComponents/Pre';
import MDXUl from '@theme/MDXComponents/Ul';
import Mermaid from '@theme/Mermaid';
import React from 'react';

import RunnableCodeBlock from '../RunnableCodeBlock/RunnableCodeBlock';

const MDXComponents = {
    head: MDXHead,
    code: MDXCode,
    a: MDXA,
    pre: MDXPre,
    Details: MDXDetails,
    ul: MDXUl,
    img: MDXImg,
    h1: (props) => <MDXHeading as="h1" {...props} />,
    h2: (props) => <MDXHeading as="h2" {...props} />,
    h3: (props) => <MDXHeading as="h3" {...props} />,
    h4: (props) => <MDXHeading as="h4" {...props} />,
    h5: (props) => <MDXHeading as="h5" {...props} />,
    h6: (props) => <MDXHeading as="h6" {...props} />,
    admonition: Admonition,
    mermaid: Mermaid,
    RunnableCodeBlock,
};
export default MDXComponents;
