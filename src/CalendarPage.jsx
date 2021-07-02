import styled from '@emotion/styled';

import TabBar from './TabBar';

const Container = styled.div({
  width: '90%',
  height: '50%',
  margin: '8em auto',
  textAlign: 'center',
});

export default function CalendarPage() {
  return (
    <Container>
      서비스가 곧 업데이트 될 예정입니다.
      <TabBar />
    </Container>
  );
}
