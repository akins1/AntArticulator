import Card from "./custom/Card/Card";


export default function SearchItem() {



    return (
        <Card tabList={["Course", "Table"]}>
            <Card.Tab tab="Course">
                <Card.Header>
                    Course Search
                </Card.Header>
                <Card.Div />
                <Card.Section>
                    HELLO
                </Card.Section>
                <Card.Section>
                    HELLO
                </Card.Section>
            </Card.Tab>
            
            <Card.Tab tab="Table">
                <Card.Header>
                    Table Search
                </Card.Header>
                <Card.Div />
                <Card.Section>
                    HELLO
                </Card.Section>
                <Card.Section>
                    HELLO
                </Card.Section>
            </Card.Tab>
        </Card>
    )
}