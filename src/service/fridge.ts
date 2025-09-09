import {supabase} from '@/lib/supabase'
import {IFridge} from "@/interfaces/fridge";

export const fridgeService = {
    async getFridge(): Promise<IFridge[]> {
        const {data, error} = await supabase
            .from('fridge')
            .select('*')
        if (error) {
            throw error
        }
        if (data.length === 0) {
            alert("No data found")
        }
        return data;
    }
}

export const fridgeServiceAddItem = {
    async addItem(fridge: IFridge): Promise<any> {

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
            throw userError;
        }
        const user = userData?.user;
        if (!user) {
            throw new Error('Nicht eingeloggt. Bitte zuerst anmelden.');
        }

        console.log(fridge.content)

        const {data, error} = await supabase
            .from('fridge')
            .insert({
                content: fridge.content,
                amount: fridge.amount,
                priority: fridge.priority,
                // Falls deine Tabelle eine user_id (UUID) oder ähnliche Eigentümer-Spalte hat:
                // Passe den Spaltennamen an, z. B. owner_id oder profile_id
            })
            .select()
        if (error) {
            throw error
        }
        return data;
    }
}