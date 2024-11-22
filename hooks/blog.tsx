'use client';
import type { Schema } from "@/amplify/data/resource"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { generateClient } from "aws-amplify/api"

const client = generateClient<Schema>()

export const usePosts = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ['posts', page, limit],
        queryFn: async () => {
            const response = await client.models.Post.list({
                limit,
            });
            return response;
        }
    });
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<Schema["Post"]['type']>) => {
            const response = await client.models.Post.create(data);
            console.log(response);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });
};

export const useReadPost = (id: string) => {
    return useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            return client.models.Post.get({id});
        }
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({id, ...data}: {id: string} & Partial<Schema["Post"]['type']>) => {
            return client.models.Post.update({id, ...data});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            return client.models.Post.delete({id});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });
};