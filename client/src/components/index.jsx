import useEth from "../contexts/EthContext/useEth";
import Main from "./Main";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();

  const demo = (
    <>
      <div>
        <Main state={state} />
      </div>
    </>
  );

  return (
    <div>
      {!state.artifact ? (
        <NoticeNoArtifact />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        demo
      )}
    </div>
  );
}

export default Demo;
