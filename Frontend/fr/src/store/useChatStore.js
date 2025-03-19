import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    gettingMessages: false,
    isUsersLoading: false,
    selectedUser: null,


    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const result = await axiosInstance.get("/messages/users");
           
            set({ users: result.data.data });
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ gettingMessages: true });
        try {
            const result = await axiosInstance.get(`/messages/${userId}`);
            console.log(result.data.data);
            set({ messages: result.data.data });
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            set({ gettingMessages: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            console.log(messageData);
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            console.log(res.data.data);
            set({ messages: [...messages, res.data.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
          const isMessageSentFromSelectedUser = newMessage.senderID === selectedUser._id;
          if (!isMessageSentFromSelectedUser) return;
    
          set({
            messages: [...get().messages, newMessage],
          });
        });
      },
    
      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
      },
    setSelectedUser: (selectedUser) => set({ selectedUser })


}))