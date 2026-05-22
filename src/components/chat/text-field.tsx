import { Button } from "@/components/ui/button"

type Props = { value: string, onChange: (v: string) => void }

export function TextField({ value, onChange }: Props){
    return(
        <div className="w-full min-w-l">
            <div className="flex flex-row border border-white rounded-xl p-2 items-center">
                <Button 
                    variant="default"
                >
                    Envoyer
                </Button>
                <input 
                    className="flex ml-5 text-white outline-none placeholder:text-gray-400"
                    value={value}
                    onChange={ (e) => onChange(e.target.value)}
                    placeholder="Entrez du texte..."
                >
                </input>
            </div>
        </div>
    )
}