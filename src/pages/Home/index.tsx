import WorkspaceSelector from "./WorkspaceSelector";
import "./Home.css";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { userCurrentUserStore } from "../../modules/auth/current-user.status";
import { Navigate, useParams } from "react-router-dom";
import { Workspace } from "../../modules/workspaces/workspace.entity";
import { useEffect, useState } from "react";
import { WorkspaceRepository } from "../../modules/workspaces/workspace.repository";
import type { Channel } from "../../modules/channels/channel.entity";
import { channelRepository } from "../../modules/channels/channel.repository";

function Home() {
  const { currentUser } = userCurrentUserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const params = useParams();
  const { workspaceId, channelId } = params;
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id == workspaceId
  );
  const selectedchannel = channels.find((channel) => channel.id == channelId);
  useEffect(() => {
    fetchWorkspaces();
  }, []);
  useEffect(() => {
    feachChannels();
  }, [workspaceId]);
  const fetchWorkspaces = async () => {
    try {
      const workspaces = await WorkspaceRepository.find();
      setWorkspaces(workspaces);
    } catch (error) {
      console.log("workspace find error", error);
    }
  };

  const feachChannels = async () => {
    try {
      const channels = await channelRepository.find(workspaceId!);
      setChannels(channels);
    } catch (error) {
      console.log("channels find error", error);
    }
  };
  if (currentUser == null) return <Navigate to="/signin" />;
  return (
    <div className="slack-container">
      <WorkspaceSelector
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
        selectedWorkspaceId={workspaceId!}
      />
      {selectedWorkspace != null && selectedchannel != null ? (
        <>
          <Sidebar
            selectedWorkspace={selectedWorkspace}
            selectedChannelId={channelId!}
            channels={channels}
            setChannels={setChannels}
          />
          <MainContent
            selectedchannel={selectedchannel}
            channels={channels}
            setChannels={setChannels}
            selectedWorkspaceId={workspaceId!}
          />
        </>
      ) : (
        <div className="sidebar" />
      )}
    </div>
  );
}

export default Home;
