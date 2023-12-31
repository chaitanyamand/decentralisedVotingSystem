import useEth from "../contexts/EthContext/useEth";
import OwnerMain from "./OwnerMain";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Owner() {
  const { state } = useEth();

  const demo = (
    <>
      <div>
        <OwnerMain state={state} />
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

export default Owner;
