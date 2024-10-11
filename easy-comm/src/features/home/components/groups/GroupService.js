// groupService.js

import { fetchWithAuth } from '../../../auth/components/authService';

class GroupService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl || process.env.REACT_APP_API_URL;
    }

    async updateGroup(originalGroupName, groupData) {
        const url = `${this.apiUrl}/groups/update`;
        try {
            const response = await fetchWithAuth(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar o grupo');
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, message: error.message || 'Erro ao atualizar o grupo' };
        }
    }
}

const groupService = new GroupService();
export default groupService;
