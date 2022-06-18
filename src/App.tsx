import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom right,
    rgb(0, 0, 255),
    rgb(255, 192, 203)
  );
`;

const Grid = styled(motion.div)`
  width: 800px;
  aspect-ratio: 1/0.75;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
`;

const Box = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
`;

const Switch = styled(motion.button)`
  margin-top: 5rem;
  background-color: rgba(255, 255, 255, 0.3);
  font-size: 2rem;
  padding: 1rem;
  border-radius: 16px;
  transition: all 0.2s;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);

  &:hover,
  &.isOn:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 1);
    cursor: pointer;
    font-weight: 700;
  }

  &.isOn {
    color: rgba(23, 255, 89, 1);
    border-color: rgba(23, 255, 89, 1);
    background-color: rgba(0, 0, 0, 0.2);
    font-weight: 700;
    transform: scale(1.1);
  }
`;

const Circle = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
`;

const Modal = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 349px;
    aspect-ratio: 1/0.75;
    background-color: rgba(255, 255, 255, 1);
    transform: translateY(-5rem);
  }
`;

function App() {
  const [isOn, setIsOn] = useState(false);
  const [boxSelected, setBoxSelected] = useState(false);
  const [index, setIndex] = useState<string>("");

  const handleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  const showModal = (layoutId: string) => {
    setIndex(layoutId);
    setBoxSelected((prev) => !prev);
  };

  return (
    <Wrapper>
      <Grid>
        <Box
          onClick={() => showModal("1")}
          initial={{ originX: 1, originY: 1 }}
          whileHover={{ scale: 1.1 }}
          layoutId="1"
        />
        <Box
          onClick={() => showModal("2")}
          initial={{ originX: 0, originY: 1 }}
          whileHover={{ scale: 1.1 }}
          layoutId="2"
        >
          {isOn ? null : (
            <Circle transition={{ duration: 0.5 }} layoutId="circle" />
          )}
        </Box>
        <Box
          onClick={() => showModal("3")}
          initial={{ originX: 1, originY: 0 }}
          whileHover={{ scale: 1.1 }}
          layoutId="3"
        >
          {isOn ? (
            <Circle transition={{ duration: 0.5 }} layoutId="circle" />
          ) : null}
        </Box>
        <Box
          onClick={() => showModal("4")}
          initial={{ originX: 0, originY: 0 }}
          whileHover={{ scale: 1.1 }}
          layoutId="4"
        />
      </Grid>
      <Switch onClick={handleSwitch} className={isOn ? "isOn" : ""}>
        Switch
      </Switch>
      <AnimatePresence>
        {boxSelected ? (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            onClick={() => showModal("")}
          >
            <Box
              layoutId={index}
              initial={{ scale: 1}}
              animate={{ scale: 1}}
              transition={{ duration: 0.5, type: "tween" }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Circle initial={{ display: 'none' }}/>
            </Box>
          </Modal>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
