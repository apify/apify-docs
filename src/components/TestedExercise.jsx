export default function TestedExercise({ children }) {
  const [exerciseCode, testCode] = children;
  if (testCode.props.className !== 'language-bats') {
    throw new Error('Exercise: Expected second child to be a Bats code block with tests');
  }
  return exerciseCode;
}

// TODO write docusaurus plugin to extract the exercises and tests from the MDX files
