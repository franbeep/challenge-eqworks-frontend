import PropTypes from 'prop-types';
import styled from 'styled-components';

import '@fontsource/roboto';

const Heading = styled.h1`
  font-family: 'Roboto';
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  color: rgba(5, 150, 105, 1);
`;

const Title = styled.h3`
  font-family: 'Roboto';
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  margin-bottom: 0;
`;

const Paragraph = styled.p`
  font-family: 'Roboto';
  opacity: 0.7;
  margin-bottom: 0;
`;

/**
 * Typography helper for any text needed
 */
function Typography({ type, children, ...rest }) {
  switch (type) {
    case 'heading':
      return <Heading {...rest}>{children}</Heading>;
    case 'title':
      return <Title {...rest}>{children}</Title>;
    case 'paragraph':
      return <Paragraph {...rest}>{children}</Paragraph>;
    default:
      return null; // !Error!
  }
}

Typography.propTypes = {
  type: PropTypes.oneOf(['heading', 'title', 'paragraph']),
};

export default Typography;
